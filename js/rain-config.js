/**
 * Matrix Rain Effect Configuration
 * 
 * Adjust these settings to customize the falling matrix rain effect.
 * Changes take effect immediately without reloading.
 */

const MATRIX_CONFIG = {
  // Color of the falling characters (hex color code)
  // Try: "#00d4ff" (bright cyan), "#00ffff" (neon cyan), "#00ff41" (green), "#ff0000" (red)
  color: '#00d4ff',

  // Size of each character in pixels
  // Smaller values = more characters fit on screen, larger = bigger/bolder look
  fontSize: 16,

  // Speed multiplier for how fast columns fall (0.5 = half speed, 2 = double speed)
  // Lower = slower/more visible effect, higher = faster cascade
  speed: 1,

  // Density of columns (lower = more spread out, higher = more packed)
  // Represents the probability of a drop appearing; used internally as 1/density
  // Typical range: 1-5 (1 = very sparse, 5 = very dense)
  density: 1.5,

  // Opacity/alpha of the fade trail (0-1)
  // Controls the "trail" fade effect; higher = stronger trail, lower = quicker fade
  // 0.05 = quick fade to black, 0.15 = slower/longer trail
  trailOpacity: 0.05,

  // Character set used for the rain effect
  // Katakana: 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾗﾘﾘﾙﾚﾜﾜﾝ'
  // Binary: '01'
  // Mixed: '01ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾗﾘﾘﾙﾚﾜﾜﾝ'
  // Hex: '0123456789ABCDEFabcdef'
  characters: '01ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾗﾘﾘﾙﾚﾜﾜﾝ',
};
