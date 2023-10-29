import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "@material-ui/core/List";
import { getProductsInCart } from "../reducks/users/selectors";
import { CartListItem } from "../components/Products";
import { PrimaryButton } from "../components/UIkit";
import { go, push } from "connected-react-router";
import { GreyButton } from "../components/UIkit";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        margin: "0 auto",
        maxWidth: 512,
        width: "100%"
    }
});

const CartList = () => {
    const classes = useStyles();
    const selector = useSelector((state) => state);
    const productsInCart = getProductsInCart(selector);
    const dispatch = useDispatch();

    const goToOrder = useCallback(() => {
        dispatch(push("/order/confirm"))
    }, []);

    const backToHome = useCallback(() => {
        dispatch(push("/"))
    }, []);

    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">
                ショッピングカート
            </h2>
            <List className={classes.root}>
                {productsInCart.length > 0 && (
                    productsInCart.map(product => 
                        <CartListItem key={product.cartId} product={product} />)
                )}
            </List>
            <div className="module-spacer--medium" />
            <div className="p-grid__column">
                <PrimaryButton label={"レジへ進む"} onClick={() => dispatch(goToOrder)} />
                <div className="module-spacer--extra-extra-small" />
                <GreyButton label={"ショッピングを続ける"} onClick={() => dispatch(backToHome)} />
            </div>
                
        </section>
    );
}

export default CartList;