import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

const SearchPage = async ({ searchParams }) => {
  const params = await searchParams;   //
  const query = params.q || "";

  await dbConnect();


  const products = await Product.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
    ],
  }).lean();

  const plainProducts = products.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 min-h-screen">
        <div className="pt-12">
          {query ? (
            <h1 className="text-2xl font-medium">
              Search results for:{" "}
              <span className="font-bold text-green-600">"{query}"</span>
            </h1>
          ) : (
            <h1 className="text-2xl font-medium">Search for products</h1>
          )}
          <div className="w-16 h-0.5 bg-green-600 rounded-full mt-2"></div>
        </div>

        {plainProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 pb-14 w-full">
            {plainProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-20">
            {query ? (
              <p className="text-lg text-gray-500">
                No products found matching your search.
              </p>
            ) : (
              <p className="text-lg text-gray-500">
                Please enter a search term to find products.
              </p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
