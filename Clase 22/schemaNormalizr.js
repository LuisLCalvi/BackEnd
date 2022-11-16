import {normalize, denormalize, schema} from 'normalizr'
import { print } from '../lib/Common.js'

const authorSchemaNmlz = new schema.Entity('authors', {}, { idAttribute: 'email' })
const messageSchemaNmlz = new schema.Entity('message', {
    author: authorSchemaNmlz
})
const messagesSchemaNmlz = {messages:[messageSchemaNmlz]}

const myData ={
    messages: [
        {
            id:1,
            author:{
                email: 'juan@gmail.com',
                name: 'Juan',
                apellido: 'Perez',
                edad: 18,
                alias: 'juancito',
                avatar: 'https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png'
            },
            text: 'hola'
        },
        {
            id:2,
            author:{
                email: 'gabriel@gmail.com',
                name: 'Gabriel',
                apellido: 'Perez',
                edad: 28,
                alias: 'gabo',
                avatar: 'https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png'
            },
            text: 'hola, como estas?'
        },
        {
            id:3,
            author:{
                email: 'Ignacio@gmail.com',
                name: 'Ignacio',
                apellido: 'Rodriguez',
                edad: 14,
                alias: 'igna',
                avatar: 'https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png'
            },
            text: 'buenos dias'
        },
        {
            id:4,
            author:{
                email: 'maria@gmail.com',
                name: 'Maria',
                apellido: 'Perez',
                edad: 28,
                alias: 'maruca',
                avatar: 'https://www.informador.mx/__export/1591209620028/sites/elinformador/img/2020/06/03/whatsapp_image_2020-06-03_at_1_22_36_pm_x1x_crop1591209586178.jpg_788543494.jpg'
            },
            text: 'hola a todos'
        },
        {
            id:5,
            author:{
                email: 'mariana@gmail.com',
                name: 'mariana',
                apellido: 'Perez',
                edad: 18,
                alias: 'mari',
                avatar: 'https://www.informador.mx/__export/1591209620028/sites/elinformador/img/2020/06/03/whatsapp_image_2020-06-03_at_1_22_36_pm_x1x_crop1591209586178.jpg_788543494.jpg'
            },
            text: 'Aguante boca'
        },
        {
            id:6,
            author:{
                email: 'juana@gmail.com',
                name: 'Juana',
                apellido: 'Garcia',
                edad: 20,
                alias: 'juanita',
                avatar: 'https://www.informador.mx/__export/1591209620028/sites/elinformador/img/2020/06/03/whatsapp_image_2020-06-03_at_1_22_36_pm_x1x_crop1591209586178.jpg_788543494.jpg'
            },
            text: 'hola, que gusto conocerlos'
        },

    ]
}
print(normalize(myData, messagesSchemaNmlz))
