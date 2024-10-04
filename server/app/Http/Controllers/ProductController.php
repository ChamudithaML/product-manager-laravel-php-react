<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Create a new product
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $product = Product::create($request->all());

        return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    }

    // Get all products
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    // Get a single product by ID
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    // Update an existing product
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->all());

        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }

    // Delete a product
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
