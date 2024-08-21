<?php

/*
  Plugin Name: My Swiggy Block
  Version: 1.0
  Author: Abhishek
Author URI: https://github.com/Bhikule19
*/


if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class SwiggyBlock {
  function __construct() {
    add_action('init', array($this, 'adminAssets'));
  }

  function adminAssets() {
    wp_register_style('quizeditcss', plugin_dir_url(__FILE__) . 'build/index.css');
    wp_register_script('ournewblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
    register_block_type('ourplugin/my-swiggy-block', array(
      'editor_script' => 'ournewblocktype',
      'editor_style' => 'quizeditcss',
      'render_callback' => array($this, 'theHTML')
    ));
  }

  function theHTML($attributes) {

    if (!is_admin()) {
        wp_enqueue_script('attentionFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'), '1.0', true);
        // wp_enqueue_style('attentionFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
      }  

      ob_start(); ?>
      <div class="swiggy-food-block-list"></div>
      <?php return ob_get_clean();
  }
}

$areYouPayingAttention = new SwiggyBlock();




