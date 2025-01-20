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

  it('should get anuncio by id', async () => {
    const mockAnuncio = { id: 1, nombre: 'Test Anuncio' };
    (AnuncioModel.getById as jest.Mock).mockResolvedValue(mockAnuncio);

    const mockReq = { params: { id: '1' } };
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const mockNext = jest.fn();

    await AnunciosController.getById(mockReq as any, mockRes as any, mockNext as any);

    expect(mockRes.json).toHaveBeenCalledWith(mockAnuncio);
  });

  it('should return 404 if anuncio not found', async () => {
    (AnuncioModel.getById as jest.Mock).mockResolvedValue(null);

    const mockReq = { params: { id: '1' } };
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const mockNext = jest.fn();

    await AnunciosController.getById(mockReq as any, mockRes as any, mockNext as any);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Anuncio no encontrado' });
  });

  it('should create a new anuncio', async () => {
    const mockAnuncio = { nombre: 'Test Anuncio' };
    const mockCreatedAnuncio = { id: 1, ...mockAnuncio };
    (AnuncioModel.create as jest.Mock).mockResolvedValue(mockCreatedAnuncio);

    const mockReq = { body: mockAnuncio };
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const mockNext = jest.fn();

    await AnunciosController.create(mockReq as any, mockRes as any, mockNext as any);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockCreatedAnuncio);
  });

  it('should update an anuncio', async () => {
    const mockAnuncio = { nombre: 'Updated Anuncio' };
    const mockUpdatedAnuncio = { id: 1, ...mockAnuncio };
    (AnuncioModel.update as jest.Mock).mockResolvedValue(mockUpdatedAnuncio);

    const mockReq = { params: { id: '1' }, body: mockAnuncio };
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const mockNext = jest.fn();

    await AnunciosController.update(mockReq as any, mockRes as any, mockNext as any);

    expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedAnuncio);
  });

  it('should delete an anuncio', async () => {
    (AnuncioModel.delete as jest.Mock).mockResolvedValue(null);

    const mockReq = { params: { id: '1' } };
    const mockRes = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const mockNext = jest.fn();

    await AnunciosController.delete(mockReq as any, mockRes as any, mockNext as any);

    expect(mockRes.status).toHaveBeenCalledWith(204);
    expect(mockRes.send).toHaveBeenCalled();
  });
});