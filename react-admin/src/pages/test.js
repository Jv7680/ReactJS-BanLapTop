import React, { useEffect } from "react";
import productApi from '../api/productApi';


export default function Test() {

    useEffect(() => {
        productApi.getAll().then((res) => {
            console.log('data', res);
        })
        .catch((err) =>  {
            console.log(err)
        })
    },
        [])

    return (
        <div>
            Test
        </div>
    )
}