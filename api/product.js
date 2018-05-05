const express = require('express')
const router = express.Router()

module.exports = router

//  Query ส่ง ค่าไปทาง URL เช่น http://localhost:7000/api/product?pid=1001
router.get('/', async(req, res) => {
  let db = req.db
  // let row
  // if (req.query.pid) {
  //   rows = await db('product').where('pid', '=', req.query.pid)
  // } else {
  //   let rows = await db('product')
  // }
  let rows = await db('product').where(function(){
    if (req.query.pid) {
      this.where('pid', '=', req.query.pid)
    }

  })
  
  res.send({
    status: true,
    product : rows,
  })




})

  //     /api/product/select
  router.post('/select/:pid', async (req, res) => {
    //req.body
    console.log(req.params.pid)
    let db = req.db
    let rows = await db('product')
      .where('pid', '=', req.params.pid)
    res.send({
      ok : true,
      product: rows[0],
    })  
    
    // update product set name=? where pid=1001
    await db('product').where({pid: req.body.pid}).update({
      name: req.body.name,
      detail: req.body.detail,
      price: req.body.price,
      img: req.body.img,
      star1: req.body.star1,
      star2: req.body.star2,
      star3: req.body.star3,
    })
    res.send({save: true})


  })


  //     /api/product/save
  router.post('/save', async (req, res) => {
    //req.body
    let db = req.db
    console.log(req.body.pid)
    // update product set name=? where pid=1001
    await db('product').where({pid: req.body.pid}).update({
      name: req.body.name,
      detail: req.body.detail,
      price: req.body.price,
      img: req.body.img,
      star1: req.body.star1,
      star2: req.body.star2,
      star3: req.body.star3,

    })
    res.send({save: true})


  })

  router.post('/add', async (req, res) => {
    //req.body
    let db = req.db
    // update product set name=? where pid=1001
    console.log("OK")
    console.log(req.db.name)
    await db('product').insert({      
      pid: req.body.pid,
      name: req.body.name,
      detail: req.body.detail,
      price: req.body.price,
      img: req.body.img,
      star1: req.body.star1,
      star2: req.body.star2,
      star3: req.body.star3,

      
    })
    res.send({save: true})


  })



//  /api/product/delete
router.post('/delete/:pid', function (req, res) {
  console.log(req.params.pid)
  req.db('product').where({pid: req.params.pid}).delete().then(() =>{
    res.send({status: true})
  }).catch(e => res.send({status: false, error: e.message}))
})




// router.post('/save2', (req, res) => {
//   let db = req.db  
//   db('t1').insert({}).then(ids => {
//     let id = ids[0]
//     Promise.all([
//       db('t2').insert({}).catch(),
//       db('t3').insert({}).catch(),
//     ]).then(() => {
//       res.send({status: true})
//     }).catch(err => {
//       res.send({status: false})
//     })    
//   })
//   console.log('ok')
// })
// router.get('/save3', async (req, res) => {
//   try {
//     let db = req.db  
//     let ids = await db('t1').insert({})
//     await Promise.all([
//       db('t2').insert({}),
//       db('t3').insert({})
//     ])
//     res.send({status: true})
//   } catch (e) {
//     res.send({status: false})
//   }
// })
// router.get('/about', function (req, res) {
//   res.send('About birds')
// })

