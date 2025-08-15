<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\User;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get a random user or create one if none exist
        $user = User::first() ?? User::factory()->create();

        $products = [
            ['name' => 'Organic Tomatoes', 'user_id' => $user->id],
            ['name' => 'Free-range Eggs', 'user_id' => $user->id],
            ['name' => 'Raw Honey', 'user_id' => $user->id],
            ['name' => 'Fresh Kale', 'user_id' => $user->id],
            ['name' => 'Avocado Oil', 'user_id' => $user->id],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
