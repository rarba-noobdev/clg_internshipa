'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const Categories = () => {

    const { products } = useAppContext();

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">Ear Phones</p>
                    <div className="w-16 h-0.5 bg-green-700 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
        {products
        .filter(product => product.category === 'Earphone')
        .map((product, index) => <ProductCard key={index} product={product} />)}
        </div>

        <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">Head Phones</p>
                    <div className="w-16 h-0.5 bg-green-700 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
        {products
        .filter(product => product.category === 'Headphone')
        .map((product, index) => <ProductCard key={index} product={product} />)}
        </div>


        <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">Laptops</p>
                    <div className="w-16 h-0.5 bg-green-700 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
        {products
        .filter(product => product.category === 'Laptop')
        .map((product, index) => <ProductCard key={index} product={product} />)}
        </div>


        <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">Watches</p>
                    <div className="w-16 h-0.5 bg-green-700 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
        {products
        .filter(product => product.category === 'Watch')
        .map((product, index) => <ProductCard key={index} product={product} />)}
        </div>


        <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">Smart Phones</p>
                    <div className="w-16 h-0.5 bg-green-700 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
        {products
        .filter(product => product.category === 'Smartphone')
        .map((product, index) => <ProductCard key={index} product={product} />)}
        </div>


        <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">Cameras</p>
                    <div className="w-16 h-0.5 bg-green-700 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
        {products
        .filter(product => product.category === 'Camera')
        .map((product, index) => <ProductCard key={index} product={product} />)}
        </div>


        <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">Accessories</p>
                    <div className="w-16 h-0.5 bg-green-700 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
        {products
        .filter(product => product.category === 'Accessories')
        .map((product, index) => <ProductCard key={index} product={product} />)}
        </div>

            </div>
            <Footer />
        </>
    );
};

export default Categories;
