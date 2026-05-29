<?php
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
