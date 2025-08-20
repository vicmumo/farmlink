<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Farm;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'category' => $this->faker->randomElement(['Grain', 'Fruit', 'Vegetable', 'Livestock']),
            'price' => $this->faker->randomFloat(2, 100, 1000),
            'quantity' => $this->faker->numberBetween(10, 100),
            'farm_id' => Farm::factory(), // Ensures product is linked to a farm
            'user_id' => User::factory(), // Ensures product is owned by a user
        ];
    }
}
