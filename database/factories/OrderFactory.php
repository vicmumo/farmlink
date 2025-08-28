<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $product = Product::inRandomOrder()->first() ?? Product::factory()->create();
    $quantity = $this->faker->numberBetween(1, 5);

    return [
        'user_id' => User::factory(),
        'product_id' => $product->id,
        'quantity' => $quantity,
        'total_price' => $product->price * $quantity,
        'status' => 'confirmed',
        'delivery_date' => now()->addDays(2),
    ];
    }
}
