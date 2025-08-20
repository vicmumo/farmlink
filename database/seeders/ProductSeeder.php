<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\User;
use App\Models\Farm;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure there's at least one user
        $user = User::first() ?? User::factory()->create([
            'name' => 'Default User',
            'email' => 'default@example.com',
            'role' => 'farmer',
        ]);

        // Ensure farms exist
        $farms = Farm::all();
        if ($farms->isEmpty()) {
            $this->command->warn('No farms found. Seeding farms...');
            $farms = Farm::factory()->count(5)->create();
        }

        // Define categories
        $categories = ['Grains', 'Fruits', 'Vegetables', 'Dairy', 'Oils'];

        // Static products linked to random farms
        $staticProducts = [
            'Organic Tomatoes',
            'Free-range Eggs',
            'Raw Honey',
            'Fresh Kale',
            'Avocado Oil',
        ];

        foreach ($staticProducts as $name) {
            Product::create([
                'name' => $name,
                'category' => $categories[array_rand($categories)],
                'quantity' => rand(10, 100),
                'user_id' => $user->id,
                'farm_id' => $farms->random()->id,
            ]);
        }

        // Specific product example
        Product::create([
            'name' => 'Maize',
            'category' => 'Grains',
            'quantity' => 50,
            'farm_id' => 1,
        ]);

        // Factory-generated products with linked relationships
        Product::factory()
            ->count(10)
            ->create()
            ->each(function ($product) use ($farms) {
                $product->farm_id = $farms->random()->id;
                $product->save();

                $linked = Product::where('id', '!=', $product->id)
                    ->inRandomOrder()
                    ->take(rand(2, 3))
                    ->pluck('id');

                $product->linkedProducts()->sync($linked);
            });
    }
}
