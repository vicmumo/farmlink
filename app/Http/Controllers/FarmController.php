<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
    use App\Models\Farm;

class FarmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Farms/Index');
    }

    public function create()
    {
        return Inertia::render('Farms/Create');
    }

    public function edit(Farm $farm)
    {
        return Inertia::render('Farms/Edit', [
            'farm' => $farm,
        ]);
    }

}
