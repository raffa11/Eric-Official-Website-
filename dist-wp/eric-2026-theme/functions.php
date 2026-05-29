<?php
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
    wp_enqueue_style( 'eric-2026-theme-css', get_stylesheet_directory_uri() . '/assets/index-D5U-gGtz.css', array(), '1.0.0' );

    // 3. Transpiled JS Module Bundle
    wp_enqueue_script( 'eric-2026-theme-js', get_stylesheet_directory_uri() . '/assets/index-Cp6Q6iNI.js', array(), '1.0.0', true );
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
