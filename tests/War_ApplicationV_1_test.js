var expect = chai.expect;

describe('MyFunctions', function(){
    describe('#playerDraw', function(){
        it('should draw 26 cards from a deck of 52', function(){
            testPlayer = new Player();
            testPlayer.draw();
            expect(testPlayer.hand().length).to.equal(26);
        });
    });
});
