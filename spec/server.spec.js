var request=require('request')

describe('calc',()=>{
    it('should mutliple 5*2',()=>{
        expect(5*2).toBe(10)
    })
})

describe('get messages',()=>{
    it('should return 200',(done)=>{
        request.get('http://localhost:3000/messages',(err, res)=>{
            expect(res.statusCode).toEqual(200)
            // console.log(res.body)
            done()
    })


})
it('should return a list, thats not empty',(done)=>{
    request.get('http://localhost:3000/messages',(err, res)=>{
        expect(JSON.parse(res.body).length).toBeGreaterThan(0)
        // console.log(res.body)
        done()
})


})
})

describe('should return a message from specific owner',()=>{
    it('should return 200',(done)=>{
        request.get('http://localhost:3000/messages/tim',(err, res)=>{
            expect(res.statusCode).toEqual(200)
            // console.log(res.body)
            done()
    })
})
it('should return data of afas',(done)=>{
    request.get('http://localhost:3000/messages/afas',(err, res)=>{
        console.log(res.body)
        expect(JSON.parse(res.body)[0].name).toEqual('afas')
        // console.log(res.body)
        done()
})
})
})