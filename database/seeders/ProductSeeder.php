<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Farm;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $farm = Farm::first();

        Product::create([
            'farm_id' => $farm->id,
            'name' => 'Kale',
            'price' => 120.00,
            'quantity' => 50,
            'harvest_date' => now()->subDays(2),
            'description' => 'Fresh organic kale harvested this week.',
        ]);

        Product::create([
            'farm_id' => $farm->id,
            'name' => 'Tomatoes',
            'price' => 90.00,
            'quantity' => 100,
            'harvest_date' => now()->subDays(1),
            'description' => 'Juicy red tomatoes, perfect for salads.',
        ]);
    }
}
