import { useState } from 'react';

import { Button, Box, styled } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { ShoppingCart as Cart, FlashOn as Flash, Favorite as Fav } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

import { addTowishlist } from '../../redux/actions/wishlistAction';
import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    }
}))

const Image = styled('img')({
    padding: '15px 20px',
    border: '1px solid #f0f0f0',
    width: '95%'
});

const StyledButton = styled(Button)`
    width: 46%;
    border-radius: 2px;
    height: 50px;
    color: #FFF;
`;

const ActionItem = ({ product }) => {
    const navigate = useNavigate();
    const { id } = product;
        
    // eslint-disable-next-line no-unused-vars
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const addItemToCart = () => {
        dispatch(addToCart(id, quantity));
        navigate('/cart');
    }

    const addItemToWishlist = () => {
        dispatch(addTowishlist(id, quantity));
        navigate('/wishlist');
    }

    return (
        <LeftContainer>
            <Image src={product.detailUrl} /><br />
            <StyledButton onClick={() => addItemToCart()} style={{marginRight: 20, background: '#ff9f00'}} variant="contained"><Cart />Add to Cart</StyledButton>
            <StyledButton onClick={() => addItemToWishlist()} style={{ background: 'rgba(255, 0, 0, 0.73);'}} variant="contained"><Fav />Add to Wishlist</StyledButton>
        </LeftContainer>
    )
}

export default ActionItem;