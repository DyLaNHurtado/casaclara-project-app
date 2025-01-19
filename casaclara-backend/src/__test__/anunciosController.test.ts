import { AnunciosController } from '../controllers/anunciosController';
import { AnuncioModel } from '../models/anuncio';

jest.mock('../models/anuncio');

describe('AnunciosController', () => {
  it('should get all anuncios', async () => {
    const mockAnuncios = [{ id: 1, nombre: 'Test Anuncio' }];
    (AnuncioModel.getAll as jest.Mock).mockResolvedValue(mockAnuncios);

    const mockReq = {};
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const mockNext = jest.fn();

    await AnunciosController.getAll(mockReq as any, mockRes as any, mockNext as any);

    expect(mockRes.json).toHaveBeenCalledWith(mockAnuncios);
  });
});