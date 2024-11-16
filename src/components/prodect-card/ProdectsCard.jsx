import { Box, Button, Card, Rating, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import ImageProdect1 from '../assets/product-img-1.jpg';
import ImageProdect2 from '../assets/product-img-2.jpg';
import ImageProdect3 from '../assets/product-img-3.jpg';

const prodectsDeta = [
  { id: 1, image: ImageProdect1, name: "product-img-1.jpg", rating: 3, price: "3.50" },
  { id: 2, image: ImageProdect2, name: "Peach Fruit", rating: 4, price: "5.00" },
  { id: 3, image: ImageProdect3, name: "Pomegranate", rating: 5, price: "10.00" },
];

const ProdectsCard = () => {
  return (
    <Box className="d-flex gap-4 flex-wrap">
      {prodectsDeta.map((product) => (
        <Card key={product.id} className=" p-3" >


          <img src={product.image} alt={product.name} />
          <Typography className='mt-5' variant='body2'>Snack & Munchies</Typography>
          <Typography variant='h6'>Haldiram's Sev Bhujia</Typography>
          <box className="d-flex gap-4">
            <Rating name="read-only" value={3} readOnly /><Typography variant='body2'>
              <Typography variant='body2'>Snack & Munchies</Typography></Typography>
          </box>

          <box className="d-flex justify-content-between mt-3">
            <Typography className='mt-2' variant='body2'>$18 $24</Typography>
            <button type="button" class="btn btn-success">  <AddIcon />Add</button>
          </box>
        </Card>


      ))}
    </Box>
  )
}

export default ProdectsCard;
