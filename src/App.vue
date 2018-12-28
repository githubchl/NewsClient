<template>
	<div id="app">
	
		<router-view />
		
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin: 0;
	}
	
	ul,
	ol,
	li,
	p,
	dl,
	dt,
	dd,
	h1,
	h2,
	h3,
	h4,
	button {
		margin: 0;
		padding: 0;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		outline: 0;
	}
	
	body {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		outline: 0;
	}
	
	.header {
		background: #FA4848;
		height: 8vh;	
		color: #FFCBA9;
		width: 100%;
		position: fixed;
		z-index: 1;
	}
	
	.ripple {
		position: relative;
	}
	
	.ripple:focus {
		outline: none;
	}
	
	.ripple:after {
		content: "";
		display: block;
		position: absolute;
		top: -10px;
		left: -10px;
		right: -10px;
		bottom: -10px;
		pointer-events: none;
		background-color: #333;
		background-repeat: no-repeat;
		background-position: 50%;
		opacity: 0;
		transition: all .3s;
	}
	
	.ripple:active:after {
		opacity: .3;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transition: 0s;
	}
</style>