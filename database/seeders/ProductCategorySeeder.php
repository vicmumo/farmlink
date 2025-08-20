<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductCategory;

class ProductCategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            ['name' => 'Grains', 'description' => 'Cereal crops like maize, wheat, rice'],
            ['name' => 'Fruits', 'description' => 'Fresh produce like mangoes, bananas'],
            ['name' => 'Vegetables', 'description' => 'Leafy greens, root crops'],
            ['name' => 'Dairy', 'description' => 'Milk, cheese, yogurt'],
            ['name' => 'Oils', 'description' => 'Avocado oil, sunflower oil'],
            ['name' => 'Livestock', 'description' => 'Cattle, goats, poultry'],
            ['name' => 'Herbs & Spices', 'description' => 'Basil, ginger, turmeric'],
        ];

        foreach ($categories as $category) {
            ProductCategory::firstOrCreate(['name' => $category['name']], $category);
        }
    }
}
