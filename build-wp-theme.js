import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { ZipArchive } from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, 'dist');
const WP_TEMP_DIR = path.join(__dirname, 'dist-wp');
const THEME_DIR = path.join(WP_TEMP_DIR, 'eric-2026-theme');
const ZIP_OUTPUT_PATH = path.join(__dirname, 'wp-eric-2026-theme.zip');
const PUBLIC_DIR = path.join(__dirname, 'public');
const PUBLIC_ZIP_PATH = path.join(PUBLIC_DIR, 'wp-eric-2026-theme.zip');

function cleanAndCreateDirs() {
  console.log('🧹 Clearing old temporary build directories...');
  if (fs.existsSync(WP_TEMP_DIR)) {
    fs.rmSync(WP_TEMP_DIR, { recursive: true, force: true });
  }
  if (fs.existsSync(ZIP_OUTPUT_PATH)) {
    fs.unlinkSync(ZIP_OUTPUT_PATH);
  }
  fs.mkdirSync(THEME_DIR, { recursive: true });
  fs.mkdirSync(path.join(THEME_DIR, 'assets'), { recursive: true });
}

function runViteBuild() {
  console.log('🚀 Running production Vite build compilation...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Vite compilation completed successfully!');
  } catch (error) {
    console.error('❌ Vite compilation failed:', error.message);
    process.exit(1);
  }
}

function scanCompiledAssets() {
  const assetsDir = path.join(DIST_DIR, 'assets');
  if (!fs.existsSync(assetsDir)) {
    console.error('❌ Dist assets directory not found at:', assetsDir);
    process.exit(1);
  }

  const files = fs.readdirSync(assetsDir);
  const jsFile = files.find(file => file.endsWith('.js'));
  const cssFile = files.find(file => file.endsWith('.css'));

  if (!jsFile || !cssFile) {
    console.error('❌ Failed to locate compiled index JS or CSS inside dist/assets/. Found:', files);
    process.exit(1);
  }

  return { jsFile, cssFile, allFiles: files };
}

function writeWordPressThemeFiles(jsFilename, cssFilename) {
  console.log('📝 Writing WordPress theme configuration, style metadata and PHP templates...');

  // 1. style.css (Required Theme Headers)
  const styleCssContent = `/*
Theme Name: ERIC 2026 Bold Typography Theme
Theme URI: https://eric2026.org/
Author: Google AI Studio Coder
Author URI: https://ai.studio/build
Description: Custom, developer-vetted premium Single Page Application (SPA) theme for Electronics Robotics Innovation Competitions (ERIC 2026). Fully responsive, features bold display typography, high-contrast aesthetics, mock fintech checkout engines, interactive admin dashboard, and SheetJS data analytics tools.
Version: 1.0.0
License: Apache License 2.0
License URI: https://www.apache.org/licenses/LICENSE-2.0.html
Text Domain: eric-2026
Tags: accessibility-ready, custom-background, custom-colors, featured-images, full-width-template, translation-ready
*/

/* Default administrative overrides if needed */
#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
`;
  fs.writeFileSync(path.join(THEME_DIR, 'style.css'), styleCssContent);

  // 2. header.php (WordPress HTML Header with older version fallbacks)
  const headerPhpContent = `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class('eric-theme-active'); ?>>
<?php 
if ( function_exists( 'wp_body_open' ) ) {
    wp_body_open();
}
?>
`;
  fs.writeFileSync(path.join(THEME_DIR, 'header.php'), headerPhpContent);

  // 3. footer.php (WordPress HTML Footer)
  const footerPhpContent = `<?php wp_footer(); ?>
</body>
</html>
`;
  fs.writeFileSync(path.join(THEME_DIR, 'footer.php'), footerPhpContent);

  // 4. index.php (Dynamic React Mounting point)
  const indexPhpContent = `<?php
/**
 * The main template file
 *
 * This theme renders a premium single-page React app (SPA). All tabs,
 * simulation grids, checkout steps, maps, exporting, and authentication modals
 * mount on the #root div below using the precompiled JS and CSS assets.
 * 
 * @package ERIC_2026_Theme
 */

get_header(); ?>

<div id="root">
    <!-- The high-fidelity React Single Page App boots here instantly -->
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70vh; font-family: sans-serif; color: #666;">
        <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #FF8A1F; border-radius: 50%; animate: spin 1s linear infinite; margin-bottom: 12px;"></div>
        <p style="font-size: 14px; font-weight: 600;">Bootstrapping ERIC 2026 Engine...</p>
    </div>
</div>

<style>
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>

<?php get_footer(); ?>
`;
  fs.writeFileSync(path.join(THEME_DIR, 'index.php'), indexPhpContent);

  // 5. functions.php (Safe Enqueuing & Theme Setup with high-compatibility filters)
  const functionsPhpContent = `<?php
/**
 * ERIC 2026 Theme Functions and Definitions
 *
 * @package ERIC_2026_Theme
 */

if ( ! function_exists( 'eric_2026_setup' ) ) {
    function eric_2026_setup() {
        // Theme supports
        add_theme_support( 'title-tag' );
        add_theme_support( 'post-thumbnails' );
        
        // Register navigation spots
        register_nav_menus( array(
            'primary' => 'Primary Menu',
        ) );
    }
}
add_action( 'after_setup_theme', 'eric_2026_setup' );

/**
 * Enqueue front-end CSS stylesheets and JS bundles.
 */
function eric_2026_scripts() {
    // 1. Google Fonts
    wp_enqueue_style( 'eric-2026-fonts', 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,500&family=JetBrains+Mono:wght@400;500;700&display=swap', array(), '1.0.0' );

    // 2. Transpiled CSS Asset
    wp_enqueue_style( 'eric-2026-theme-css', get_stylesheet_directory_uri() . '/assets/${cssFilename}', array(), '1.0.0' );

    // 3. Transpiled JS Module Bundle
    wp_enqueue_script( 'eric-2026-theme-js', get_stylesheet_directory_uri() . '/assets/${jsFilename}', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'eric_2026_scripts' );

/**
 * Modern browsers require script type="module" to execute Vite ES Module imports.
 * Ultra-safe type-checking and tag substitution prevents critical errors on PHP 8.x.
 */
function eric_2026_add_module_type($tag, $handle = '') {
    if (!is_string($tag) || empty($tag)) {
        return $tag;
    }
    if ('eric-2026-theme-js' === $handle) {
        return str_replace(' src', ' type="module" src', $tag);
    }
    return $tag;
}
add_filter('script_loader_tag', 'eric_2026_add_module_type', 10, 2);

/**
 * Hide the WordPress admin bar for guests or entirely on the frontend.
 */
add_filter('show_admin_bar', '__return_false');
`;
  fs.writeFileSync(path.join(THEME_DIR, 'functions.php'), functionsPhpContent);

  // 6. readme.txt (WordPress standard theme setup documentation)
  const readmeTxtContent = `=== ERIC 2026 Theme ===
Contributors: Custom AI Coding Agent (Google AI Studio)
Tags: premium, dark-mode, bentoGrid, high-octane, react
Requires at least: 5.0
Tested up to: 6.5
Stable tag: 1.0.0
License: Apache License 2.0
License URI: https://www.apache.org/licenses/LICENSE-2.0.html

== Description ==
This is the official assembled WordPress theme containing the pre-compiled, highly responsive, bento-grid styled frontend. It hosts the 125K USD tournament scheduler, registration wizard, custom secure financial simulation checkout component, and an Excel analysis analytics suite.

== Installation ==
1. Log in to your WordPress Admin Area.
2. Navigate to "Appearance" -> "Themes" -> "Add New".
3. Click "Upload Theme" and select the 'wp-eric-2026-theme.zip' file.
4. Click "Install Now" then "Activate".
5. All done! Enjoy the high-performance react workspace directly running on top of WordPress.
`;
  fs.writeFileSync(path.join(THEME_DIR, 'readme.txt'), readmeTxtContent);
}

function copyCompiledAssets(jsFilename, cssFilename, allFiles) {
  console.log('📂 Copying compiled JS/CSS static assets...');
  
  // Copy specific JS & CSS files
  fs.copyFileSync(
    path.join(DIST_DIR, 'assets', jsFilename),
    path.join(THEME_DIR, 'assets', jsFilename)
  );
  
  fs.copyFileSync(
    path.join(DIST_DIR, 'assets', cssFilename),
    path.join(THEME_DIR, 'assets', cssFilename)
  );

  // Copy any other static asset (icons/images/etc.) generated by the build
  allFiles.forEach(file => {
    if (file !== jsFilename && file !== cssFilename) {
      fs.copyFileSync(
        path.join(DIST_DIR, 'assets', file),
        path.join(THEME_DIR, 'assets', file)
      );
    }
  });

  console.log('✅ Asset copies completed.');
}

function createZipArchive() {
  console.log('📦 Archiving folder into zip format using Archiver...');
  return new Promise((resolve, reject) => {
    try {
      const output = fs.createWriteStream(ZIP_OUTPUT_PATH);
      const archive = new ZipArchive({ zlib: { level: 9 } });

      output.on('close', () => {
        const stats = fs.statSync(ZIP_OUTPUT_PATH);
        console.log(`🎉 ZIP Archive successfully constructed! Final total: ${stats.size} bytes.`);
        console.log(`📁 File location: ${ZIP_OUTPUT_PATH}`);
        resolve(ZIP_OUTPUT_PATH);
      });

      archive.on('error', (error) => {
        console.error('❌ Failed to construct ZIP archive:', error);
        reject(error);
      });

      archive.pipe(output);
      archive.directory(THEME_DIR, 'eric-2026-theme');
      archive.finalize();
    } catch (error) {
      console.error('❌ Failed to construct ZIP archive:', error);
      reject(error);
    }
  });
}

async function main() {
  console.log('==================================================');
  console.log('🏁 STARTING WORDPRESS THEME EXTRACTION SEQUENCE');
  console.log('==================================================');

  // Verify and cleanup
  cleanAndCreateDirs();
  
  // Compile React APP
  runViteBuild();

  // Find outputs
  const { jsFile, cssFile, allFiles } = scanCompiledAssets();
  console.log(`🔍 Found JS compiled bundle: ${jsFile}`);
  console.log(`🔍 Found CSS compiled bundle: ${cssFile}`);

  // Draft Theme files
  writeWordPressThemeFiles(jsFile, cssFile);

  // Copy dist directories
  copyCompiledAssets(jsFile, cssFile, allFiles);

  // Pack into zip
  await createZipArchive();

  // Ensure public folder is available and copy the archive over
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.log('📂 Creating public folder...');
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
  fs.copyFileSync(ZIP_OUTPUT_PATH, PUBLIC_ZIP_PATH);
  console.log(`✅ Copied standard zip package to public static server path at: ${PUBLIC_ZIP_PATH}`);

  console.log('==================================================');
  console.log('🚀 WORDPRESS THEME ARCHIVE READY FOR DOWNLOAD!');
  console.log('==================================================');
}

main().catch(err => {
  console.error('❌ An unexpected error occurred during execution:', err);
  process.exit(1);
});
