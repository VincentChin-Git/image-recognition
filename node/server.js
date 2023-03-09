const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const md5 = require('md5');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'vincent',
        password: '',
        database: 'image_recognition',
    }
})

// console.log(postgres.select('*').from('users'));

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send({ 'msg': 'hi' });
})

// authenticate user
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    let pass_md5 = md5(password);
    db.select('*')
        .from('users')
        .where('email', '=', email)
        .andWhere('password', '=', pass_md5)
        .then(rows => {
            if (rows.length > 0) {
                let user = rows[0];
                let { user_id, name } = user
                db.select('*')
                    .from('users')
                    .orderBy('entries', 'desc')
                    .orderBy('user_id', 'asc')
                    .then(ranks => {
                        let rank = 100;
                        for (let index = 0; index < ranks.length; index++) {
                            if (ranks[index].user_id === user_id) {
                                rank = index + 1;
                                break;
                            }
                        }
                        res.json({
                            status: 'success',
                            data: { name, rank, user_id },
                        })
                    })
            }
            else if (rows.length == 0) {
                res.json({ status: 'info' })
            }
            else { res.json({ status: 'error' }) }
        })
        .catch(error => {
            console.log(error);
        });

})

// register new user
app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    let pass_md5 = md5(password);
    db('users')
        .insert({ email, name, password: pass_md5 })
        .then(() => {
            res.json({ status: 'success' })
        })
        .catch(err => {
            res.json({ status: 'error' })
        })
})


app.get('/profile/:id', (req, res) => {
    const { id } = req.params();
})

// update face recoginition usage
app.post('/image', (req, res) => {
    const { id, image_link } = req.body;
    console.log(id)
    db('image')
        .insert({ user_id: id, image_link })
        .then(() => {
            db.select('entries')
                .from('users')
                .where('user_id', '=', id)
                .then(rows => {
                    let { entries } = rows[0];
                    entries++;
                    console.log(entries)
                    db('users').where('user_id', '=', id)
                        .update({
                            entries
                        })
                        .then(() => res.json({ status: 'success' }))
                })
        })
        .catch(err => {
            res.json({ status: 'error' })
        })


})

app.get('/history/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    db.select('image_link')
        .from('image')
        .where('user_id', '=', user_id)
        .groupBy('image_link')
        .then(rows => {
            let result = rows.map((image_link, index) => (
                image_link.image_link
            ))
            res.json(result);
        })

})

app.listen('4000');