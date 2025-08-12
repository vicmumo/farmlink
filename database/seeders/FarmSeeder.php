<?php

namespace Database\Seeders;

use App\Models\Farm;
use App\Models\User;
use Illuminate\Database\Seeder;

class FarmSeeder extends Seeder
{
    public function run()
    {
        $farmer = User::where('role', 'farmer')->first();

        Farm::create([
            'user_id' => $farmer->id,
            'name' => 'Green Acres',
            'location' => 'Mombasa, Kenya',
            'certifications' => 'Organic, GAP',
            'description' => 'A small-scale farm focused on sustainable practices.',
        ]);
    }
}
