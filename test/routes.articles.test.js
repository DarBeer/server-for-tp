const chai = require('chai'),
      chaiHttp = require('chai-http'),
      app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Articles", () => {
    describe("GET /", () => {
        // Test to get all articles record
        it("should get all articles record", (done) => {
            chai.request(app)
                .get('/data/articles')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        // Test to get single artilce record
        it("should get a single article record", (done) => {
            const id = '5d96715d71b6d41bf8ba2041';
            chai.request(app)
                .get(`/data/articles/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});