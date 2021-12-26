const chai = require('chai');
const chaiHttp = require('chai-http');
const Concert = require('../../../Models/concert.model');
const server = require('../../../server');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testConcertOne = new Concert({
      performer: 'john',
      genre: 'rock',
      price: 20,
      day: 1,
      image: 'an image',
    });    
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      performer: 'john',
      genre: 'rock',
      price: 100,
      day: 1,
      image: 'an image1',
    });    
    await testConcertTwo.save();
  });
  
  after(async () => {
    await Concert.deleteMany();
  });

  it('should return all the data with "find" method', async () => {
    const departments = await Concert.find();
    const expectedLength = 2;
    expect(departments.length).to.be.equal(expectedLength);
  });

  it('/performer/:performer should return one performer by :performer', async () => {
     
     const res = await request(server).get('/api/concerts/performer/john');
     expect(res.status).to.be.equal(200);
     expect(res.body).to.be.an('array');
     expect(res.body.length).to.be.equal(2);
  });   

  it('/genre/:genre should return genre by :genre', async () => {
   
    const res = await request(server).get('/api/concerts/genre/rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });   

  it('/price/:min/:max should return concerts in range between >= :price_min && <= price_max', async () => {

    const res = await request(server).get('/api/concerts/price/1/100');
    const con = await Concert.find({ $and: [{ price: { $gte: 1 } }, { price: { $lte: 101 } }] });
    expect(con).not.to.be.null;
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).not.to.be.null;
    expect(res.body.length).to.be.equal(2);
  });   

  it('/:day should return concerts by :day', async () => {

    const res = await request(server).get('/api/concerts/day/1');
    const con = await Concert.find({ day:  1 });
    expect(con).not.to.be.null;
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).not.to.be.null;
    expect(res.body.length).to.be.equal(2);
  });   


});