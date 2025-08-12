<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CheckInertiaViews extends Command
{
    protected $signature = 'inertia:check-views';
    protected $description = 'Verify that all Inertia::render() views exist in resources/js/pages';

    public function handle()
    {
        $basePath = resource_path('js/pages');
        $phpFiles = File::allFiles(app_path('Http/Controllers'));

        $missingViews = [];

        foreach ($phpFiles as $file) {
            $contents = File::get($file->getRealPath());

            preg_match_all("/Inertia::render\\(['\"](.*?)['\"]/", $contents, $matches);

            foreach ($matches[1] as $viewPath) {
                $expectedFile = $basePath . '/' . str_replace('/', DIRECTORY_SEPARATOR, $viewPath) . '.jsx';

                if (!File::exists($expectedFile)) {
                    $missingViews[] = $viewPath;
                }
            }
        }

        if (empty($missingViews)) {
            $this->info('✅ All Inertia views are present.');
        } else {
            $this->warn('⚠️ Missing Inertia views:');
            foreach ($missingViews as $view) {
                $this->line("- " . $view);
            }
        }
    }
}
