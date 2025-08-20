<?php

namespace Database\Seeders;

use App\Models\Farm;
use App\Models\User;
use Illuminate\Database\Seeder;

class FarmSeeder extends Seeder
{
    public function run(): void
    {
        $farmer = User::where('role', 'farmer')->first();

        if (!$farmer) {
            $farmer = User::factory()->create([
                'name' => 'Default Farmer',
                'email' => 'farmer@example.com',
                'role' => 'farmer',
            ]);
        }

        Farm::factory()->count(3)->create([
            'user_id' => $farmer->id,
        ]);

        Farm::create([
            'user_id' => $farmer->id,
            'name' => 'Green Acres',
            'location' => 'Mombasa, Kenya',
            'owner' => 'Jane Mwende',
            'certifications' => 'Organic, GAP',
            'description' => 'A small-scale farm focused on sustainable practices.',
        ]);

    }
}
