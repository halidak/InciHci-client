import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View, Image, Button } from "react-native";
import { RateProductContext } from "../../../services/rate/rate.context";
import { AuthContext } from "../../../services/auth/auth.context";
import { ProductDetailsContext } from "../../../services/product/product-details.context";

export const RateProductComponent = ({productId, navigation }) => {
    const {rateProduct} = useContext(RateProductContext);
    const [defaultRating, setDefaultRating] = useState(1);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const { user } = useContext(AuthContext);


    console.log(defaultRating)

    const starImgFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    const starImgCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

    const rate = async() => {
        await rateProduct(user._id, productId, defaultRating);

        navigation.goBack();

    }

    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingBarStyle}>
                {
                    maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={() => setDefaultRating(item)}>
                                <Image
                                    style={styles.starImgStyle}
                                    source={
                                        item <= defaultRating
                                            ? { uri: starImgFilled }
                                            : { uri: starImgCorner }
                                    }
                                />
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        );
    };

    console.log(productId)
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                How would you rate this product?
            </Text>
            <CustomRatingBar />
            <Text style={styles.textStyle}>
                {defaultRating} / {Math.max.apply(null, maxRating)}
            </Text>
            <Button onPress={rate} title="Rate the product"></Button>
        </View>  
      )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    starImgStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 23,
        color: '#000',
        marginTop: 15,
    },
    buttonStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
        padding: 15,
    },
    buttonTextStyle: {
        color: '#fff',
        textAlign: 'center',
    },
}
);