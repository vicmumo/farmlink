<?php

namespace Database\Factories;

use App\Models\Farm;
use Illuminate\Database\Eloquent\Factories\Factory;

class FarmFactory extends Factory
{
    protected $model = Farm::class;

    public function definition(): array
    {
        return [
            'name' => 'Green Acres',
            'location' => 'Mombasa, Kenya',
            'owner' => 'Mr. Reece Tillman V', 
            'certifications' => 'Organic, GAP',
            'description' => 'A small-scale farm focused on sustainable practices.',
            'user_id' => 1,
        ];

    }
}
