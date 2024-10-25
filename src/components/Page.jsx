import React, { useState, useEffect } from "react";

const Page = () => {
    const data = [
        { "id": 1, "name": "Product 1" },
        { "id": 2, "name": "Product 2" },
        { "id": 3, "name": "Product 3" },
        { "id": 4, "name": "Product 4" },
        { "id": 5, "name": "Product 5" },
        { "id": 6, "name": "Product 6" },
        { "id": 7, "name": "Product 7" },
        { "id": 8, "name": "Product 8" },
        { "id": 9, "name": "Product 9" },
        { "id": 10, "name": "Product 10" },
        { "id": 11, "name": "Product 11" },
        { "id": 12, "name": "Product 12" },
        { "id": 13, "name": "Product 13" },
        { "id": 14, "name": "Product 14" },
        { "id": 15, "name": "Product 15" },
        { "id": 16, "name": "Product 16" },
        { "id": 17, "name": "Product 17" },
        { "id": 18, "name": "Product 18" },
        { "id": 19, "name": "Product 19" },
        { "id": 20, "name": "Product 20" },
        { "id": 21, "name": "Product 21" },
        { "id": 22, "name": "Product 22" },
        { "id": 23, "name": "Product 23" },
        { "id": 24, "name": "Product 24" },
        { "id": 25, "name": "Product 25" },
        { "id": 26, "name": "Product 26" },
        { "id": 27, "name": "Product 27" },
        { "id": 28, "name": "Product 28" },
        { "id": 29, "name": "Product 29" },
        { "id": 30, "name": "Product 30" },
        { "id": 31, "name": "Product 31" },
        { "id": 32, "name": "Product 32" },
        { "id": 33, "name": "Product 33" },
        { "id": 34, "name": "Product 34" },
        { "id": 35, "name": "Product 35" },
        { "id": 36, "name": "Product 36" },
        { "id": 37, "name": "Product 37" },
        { "id": 38, "name": "Product 38" },
        { "id": 39, "name": "Product 39" },
        { "id": 40, "name": "Product 40" },
        { "id": 41, "name": "Product 41" },
        { "id": 42, "name": "Product 42" },
        { "id": 43, "name": "Product 43" },
        { "id": 44, "name": "Product 44" }
    ];

    const [products, setProducts] = useState([]);  // To store loaded products
    const [currentPage, setCurrentPage] = useState(1);  // To track the current page
    const [canLoadMore, setCanLoadMore] = useState(true);  // Flag for loading more products

    const PRODUCTS_PER_PAGE = 20;  // Products per page

    // Function to load products based on the current page
    const loadProducts = (page) => {
        const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;

        const newProducts = data.slice(startIndex, endIndex); // Use 'data' instead of 'productsData'

        // Update products state
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);

        // Check if we've loaded all products
        if (endIndex >= data.length) {
            setCanLoadMore(false);
        }
    };

    // Load more products when the button is clicked
    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        loadProducts(nextPage);
        setCurrentPage(nextPage);
    };

    // Load previous products when the Prev button is clicked
    const handleLoadPrev = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            setProducts(data.slice(0, prevPage * PRODUCTS_PER_PAGE));
            setCanLoadMore(true); // Reset load more since we might load less than PRODUCTS_PER_PAGE
        }
    };

    // Load initial products on mount
    useEffect(() => {
        loadProducts(currentPage);
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>

            {canLoadMore && (
                <button onClick={handleLoadMore}>Load More</button>
            )}

            {currentPage > 1 && (
                <button onClick={handleLoadPrev}>Prev</button>
            )}
        </div>
    );
};

export default Page;
