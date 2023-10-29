import React, {useEffect, useState, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import { db } from "../firebase";
import { makeStyles } from "@material-ui/core";
import HTMLReactParser from "html-react-parser";
import {ImageSwiper} from "../components/Products";
import {SizeTable} from "../components/Products";
import {FirebaseTimestamp} from "../firebase";
import {addProductToCart} from "../reducks/users/operations";

const useStyles = makeStyles((theme) => ({
    sliderBox: {
        [theme.breakpoints.down("sm")]: {
            margin: "0 auto 24px auto",
            height: 320,
            width: 320,
        },
        [theme.breakpoints.up("sm")]: {
            margin: "0 auto",
            height: 400,
            width: 400,
        },
    },
    detail: {
        textAlign: "left",
        [theme.breakpoints.down("sm")]: {
            margin: "0 auto 16px auto",
            height: "auto",
            width: 320,
        },
        [theme.breakpoints.up("sm")]: {
            margin: "0 auto",
            height: "auto",
            width: 400,
        },
    },
    price: {
        fontSize: 36,
    },
    description: {
        fontSize: 16,
    },
}));

const returnCodeToBr = (text) => {
    if (text === "") {
        return text;
    } else {
        return HTMLReactParser(text.replace(/\r?\n/g, "<br/>"));
    }
}

const ProductDetail = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const selector = useSelector((state) => state);
    const path = selector.router.location.pathname;
    const id = path.split("/product/")[1];
    
    const [product, setProduct] = useState(null);

    useEffect(() => {
        db.collection("products").doc(id).get()
            .then(doc => {
                const data = doc.data();
                setProduct(data);
            })
    }, []);

    const addProduct = useCallback((selectedSize) => {
        const timestamp = FirebaseTimestamp.now();
        dispatch(addProductToCart({
                added_at: timestamp,
                images: product.images,
                name: product.name,
                gender: product.gender,
                price: product.price,
                size: selectedSize,
                productId: id,
                quantity: 1,
                updated_at: timestamp,
            }))
    }, [product]);
        
    return (
        <section className="c-center-wrapin">
        
            {product && (
                <div className="p-grid__row">
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={product.images} />
                    </div>
                    <div className={classes.detail}>
                        <h2 className="u-text__headline">{product.name}</h2>
                        <p className={classes.price}>¥{product.price.toLocaleString()}</p>
                        <div className="module-spacer--small"/>
                        <SizeTable addProduct={addProduct} sizes={product.sizes} />
                        <div className="module-spacer--small"/>
                        <p>{returnCodeToBr(product.description)}</p>
                    </div>
                </div>
            )}
        
            
        </section>
    )
}

export default ProductDetail;