<?php
/*
Plugin Name: Simple Sign-in (SSI)
Plugin URI: https://github.com/morganestes/simple-sign-in
Description: Adds a simple dropdown/expanding sign-in form wherever needed.
Version: 0.1
Author: Morgan W. Estes
Author URI: http://morganestes.me/
*/

/**
 * Copyright (c) `date "+%Y"` Morgan W. Estes. All rights reserved.
 *
 * Released under the GPL license
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * This is an add-on for WordPress
 * http://wordpress.org/
 *
 * **********************************************************************
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * **********************************************************************
 */

define( 'SIMPLE_SIGNIN_PATH', plugin_dir_path( __FILE__ ) );

add_action( 'wp_print_styles', 'add_simple_signin_styles' );
add_action( 'wp_print_scripts', 'add_simple_signin_scripts' );

function add_simple_signin_styles() {
    wp_register_style( 'signin', SIMPLE_SIGNIN_PATH . 'css/signin.css', null, null, 'screen' );
    wp_enqueue_style( 'signin' );
}

function add_signin_scripts() {
    wp_enqueue_script( 'signin', SIMPLE_SIGNIN_PATH . 'js/signin.js', 'jquery' );
    wp_enqueue_script( 'showpassword', SIMPLE_SIGNIN_PATH . 'js/jquery.showpassword-1.0.js', 'jquery' );
    wp_enqueue_script( 'DOMWindow', SIMPLE_SIGNIN_PATH . 'js/jquery.DOMWindow.js', 'jquery' );
}

function show_simple_signin() {
?>
           <div id="signin-wrapper">
            <div id="signin-topnav">
                <a href="#" class="signin-link"><span>Members, sign in here</span></a>
            </div>
            <div id="signin-menu">
                <form method="post" id="simple-sign-in" name="signin" action="https://secure.okbar.org/logon">
                    <label for="user">
                        Bar #
                    </label>
                    <input id="user" name="user" value="" title="Bar Number" tabindex="4"
                    type="text">
                    </p>
                    <p>
                        <label for="password">
                            Password
                        </label>
                        <input id="password" name="password" value="" title="Password" tabindex="5"
                        type="password">
                        <input id="show" type="checkbox" />
                        <label>
                            Show password
                        </label>
                    </p>
                    <br>
                    <p>
                        <input type="radio" name="whereto" id="fastcase" value="fastcase" title="Sign in to Fastcase"
                        checked="checked" />
                        <label for="fastcase" title="Sign in to Fastcase">
                            <strong>
                                Fastcase
                            </strong>
                        </label>
                        &emsp;
                        <input type="radio" name="whereto" id="my" value="my" title="Sign in to myOKBar"
                        />
                        <label for="my" title="Sign in to myOKBar">
                            <strong>
                                myOKBar
                            </strong>
                        </label>
                    </p>
                    <br>
                    <p>
                        <input value="Sign in" tabindex="6" type="submit" onclick="submitForm();"
                        />
                    </p>
                    <p class="forgot">
                        <a href="https://secure.okbar.org/logon/okbarpass" id="resend-password-link">Forgot your password?</a>
                    </p>
                </form>
            </div>
        </div>
<?php } ?>