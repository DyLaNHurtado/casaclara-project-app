import puppeteer, { Browser, Page } from 'puppeteer';
import { Anuncio } from '../types/anuncio';
import logger from '../utils/logger';
import { GeocodingService } from './geocodingService';

class ScrapingService {
  private browser: Browser | null = null;
  private readonly RATE_LIMIT_DELAY = 1000; // 1 second delay between requests

  private async initBrowser(): Promise<void> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      });
    }
  }

  private async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  private async getPage(): Promise<Page> {
    await this.initBrowser();
    const page = await this.browser!.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    return page;
  }

  private async scrapePage(url: string, source: 'idealista' | 'fotocasa' | 'pisos'): Promise<Anuncio[]> {
    const page = await this.getPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle0' });
      
      return await page.evaluate(this.getScrapingFunction(source));
    } catch (error) {
      logger.error(`Error scraping ${source}:`, error);
      throw error;
    } finally {
      await page.close();
    }
  }

  private getScrapingFunction(source: 'idealista' | 'fotocasa' | 'pisos'): () => Promise<Anuncio[]> {
    switch (source) {
      case 'idealista':
        return this.scrapeIdealista;
      case 'fotocasa':
        return this.scrapeFotocasa;
      case 'pisos':
        return this.scrapePisos;
      default:
        throw new Error(`Unsupported source: ${source}`);
    }
  }

  private scrapeIdealista = async (): Promise<Anuncio[]> => {
    const anuncios: Anuncio[] = [];
    const items = document.querySelectorAll('.item-info-container');
    
    for (const item of items) {
      const anuncio = this.extractAnuncioData(item, {
        titleSelector: '.item-link',
        priceSelector: '.item-price',
        locationSelector: '.item-detail-location',
        descriptionSelector: '.item-description',
        imageSelector: 'img.item-multimedia__main-image',
        phoneSelector: '.phone-number',
        ownerTypeSelector: '.item-owner-type',
        categorySelector: '.item-type'
      });
      anuncios.push(anuncio);
    }
    return anuncios;
  }

  private scrapeFotocasa = async (): Promise<Anuncio[]> => {
    const anuncios: Anuncio[] = [];
    const items = document.querySelectorAll('.re-CardPackMinimal');
    
    for (const item of items) {
      const anuncio = this.extractAnuncioData(item, {
        titleSelector: '.re-CardPackMinimal-title',
        priceSelector: '.re-CardPackMinimal-price',
        locationSelector: '.re-CardPackMinimal-location',
        descriptionSelector: '.re-CardPackMinimal-description',
        imageSelector: 'img.re-CardPackMinimal-slider-image',
        phoneSelector: '.re-CardPackMinimal-phone',
        ownerTypeSelector: '.re-CardPackMinimal-owner',
        categorySelector: '.re-CardPackMinimal-type'
      });
      anuncios.push(anuncio);
    }
    return anuncios;
  }

  private scrapePisos = async (): Promise<Anuncio[]> => {
    const anuncios: Anuncio[] = [];
    const items = document.querySelectorAll('.ad-preview');
    
    for (const item of items) {
      const anuncio = this.extractAnuncioData(item, {
        titleSelector: '.ad-preview__title',
        priceSelector: '.ad-preview__price',
        locationSelector: '.ad-preview__location',
        descriptionSelector: '.ad-preview__description',
        imageSelector: 'img.ad-preview__image',
        phoneSelector: '.ad-preview__phone',
        ownerTypeSelector: '.ad-preview__owner',
        categorySelector: '.ad-preview__type'
      });
      anuncios.push(anuncio);
    }
    return anuncios;
  }

  private extractAnuncioData(item: Element, selectors: {
    titleSelector: string;
    priceSelector: string;
    locationSelector: string;
    descriptionSelector: string;
    imageSelector: string;
    phoneSelector: string;
    ownerTypeSelector: string;
    categorySelector: string;
  }): Anuncio {
    const titulo = item.querySelector(selectors.titleSelector)?.textContent?.trim() || '';
    const precio = parseFloat(item.querySelector(selectors.priceSelector)?.textContent?.replace(/[^0-9,]/g, '').replace(',', '.') || '0');
    const ubicacion = item.querySelector(selectors.locationSelector)?.textContent?.trim() || '';
    const descripcion = item.querySelector(selectors.descriptionSelector)?.textContent?.trim() || '';
    const fotoUrl = item.querySelector(selectors.imageSelector)?.getAttribute('src') || '';
    const telefono = item.querySelector(selectors.phoneSelector)?.textContent?.trim() || '';
    const tipo = item.querySelector(selectors.ownerTypeSelector)?.textContent?.toLowerCase().includes('particular') ? 'particular' : 'inmobiliaria';
    const categoria = item.querySelector(selectors.categorySelector)?.textContent?.trim() || 'Vivienda';

    return {
      nombre: titulo,
      telefono,
      tipo,
      categoria,
      precio,
      ubicacion,
      coordenadas: { lat: 0, lng: 0 }, // Se actualizará después
      fotos: [fotoUrl],
      descripcion
    };
  }

  private async enrichAnuncio(anuncio: Anuncio): Promise<Anuncio> {
    // Obtener coordenadas
    anuncio.coordenadas = await GeocodingService.getCoordinates(anuncio.ubicacion);

    // Clasificar el número de teléfono
    if (anuncio.telefono) {
      anuncio.tipo = this.clasificarNumeroTelefono(anuncio.telefono);
    }

    return anuncio;
  }

  private clasificarNumeroTelefono(telefono: string): 'particular' | 'inmobiliaria' {
    const numeroLimpio = telefono.replace(/\D/g, '').slice(-9);

    // Prefijos de móviles particulares en España
    const prefijosMobilesParticulares = ['6', '7'];

    const prefijosTelefonosFijos = ['91', '93', '95', '96', '98'];

    if (prefijosMobilesParticulares.some(prefijo => numeroLimpio.startsWith(prefijo))) {
      return 'particular';
    }

    if (prefijosTelefonosFijos.some(prefijo => numeroLimpio.startsWith(prefijo))) {
      return 'inmobiliaria';
    }

    return 'inmobiliaria';
  }

  async scrapeMultiplePages(baseUrl: string, totalPages: number, source: 'idealista' | 'fotocasa' | 'pisos'): Promise<Anuncio[]> {
    let allAnuncios: Anuncio[] = [];

    for (let i = 1; i <= totalPages; i++) {
      const url = `${baseUrl}${i}`;
      const anuncios = await this.scrapePage(url, source);

      // Enriquecer cada anuncio con información adicional
      const enrichedAnuncios = await Promise.all(anuncios.map(anuncio => this.enrichAnuncio(anuncio)));

      allAnuncios = [...allAnuncios, ...enrichedAnuncios];
      logger.info(`Scraped ${source} page ${i} of ${totalPages}`);

      // Respetar el rate limit
      await new Promise(resolve => setTimeout(resolve, this.RATE_LIMIT_DELAY));
    }

    return allAnuncios;
  }

  async initialize(): Promise<void> {
    await this.initBrowser();
    logger.info('Scraping service initialized');
  }

  async close(): Promise<void> {
    await this.closeBrowser();
    logger.info('Scraping service closed');
  }
}

export const scrapingService = new ScrapingService();

