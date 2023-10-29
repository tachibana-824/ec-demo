import React,{useState} from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import NoImage from "../../assets/img/src/no_image.png";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import {IconButton} from "@material-ui/core";
import {Menu} from "@material-ui/core";
import {MenuItem} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {deleteProduct} from "../../reducks/products/operations";

const useStyles = makeStyles((theme) =>({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(50% - 16px)'
        },
        [theme.breakpoints.up('sm')]: {
            margin: 16,
            width: 'calc(33.3333% - 32px)'
        }
    },
    content: {
        display: 'flex',
        padding: '16px 8px',
        textAlign: 'left',
        '&:last-child': {
            paddingBottom: 16
        }
    },
    media: {
        height: 0,
        paddingTop: '100%'
    },
    price: {
        color: theme.palette.secondary.main,
        fontSize: 16
    }

}))


const ProductCard = (props) => {
    const price = props.price.toLocaleString();
    const dispatch = useDispatch();
    const classes = useStyles();
    const images = (props.images.length > 0) ? props.images : [{path: NoImage}];

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Card className={classes.root}>
            <CardMedia 
                image={images[0].path} 
                className={classes.media}
                title=""
                onClick={() => dispatch(push('/product/' + props.id))}
                />
            <CardContent className={classes.content}>
                <div onClick={() => dispatch(push('/product/' + props.id))}>
                    <Typography color="textSecondary" component="p">
                        {props.name}
                    </Typography>
                    <Typography className={classes.price} component="p">
                        ¥{price}
                    </Typography>
                </div>
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={() => {
                            dispatch(push('/product/edit/' + props.id))
                            handleClose()
                        }}
                        >
                        編集する
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            dispatch(deleteProduct(props.id))
                            handleClose()
                        }}
                        >
                        削除する
                    </MenuItem>
                </Menu>
            </CardContent>
        </Card>
    )
}

export default ProductCard;