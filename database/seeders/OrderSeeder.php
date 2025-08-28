<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Product;

class OrderSeeder extends Seeder
{
    public function run()
    {
        $consumer = User::where('role', 'consumer')->first();

        $product = Product::inRandomOrder()->first() ?? Product::factory()->create();

        $quantity = rand(1, 7); // Simulate ordering 1–5 units

        Order::create([
            'user_id' => $consumer->id,
            'product_id' => $product->id,
            'quantity' => $quantity,
            'total_price' => 210.00,
            'status' => 'confirmed',
            'delivery_date' => now()->addDays(2),
        ]);

        Order::factory()->count(10)->create(); // Link to random users/products

    }
}
