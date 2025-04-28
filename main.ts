input.onGesture(Gesture.ThreeG, function () {
    robot.motorStop()
    CutebotPro.turnOffAllHeadlights()
})
robot.onLineLeftRightDetected(true, true, function () {
    robot.motorSteer(0, rychlost)
    cuteBot.colorLight(cuteBot.RGBLights.ALL, 0x00ff00)
})
input.onButtonPressed(Button.A, function () {
    rychlost = -10
    strip.showColor(neopixel.colors(NeoPixelColors.White))
    for (let index = 0; index < 4; index++) {
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xffffff)
        basic.pause(100)
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0x000000)
        basic.pause(100)
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    robot.setColor(0x00ff00)
    robot.motorTank(rychlost, rychlost)
    strip.showColor(neopixel.colors(NeoPixelColors.White))
})
robot.onLineLeftRightDetected(false, true, function () {
    robot.motorSteer(doprava, rychlost)
    cuteBot.colorLight(cuteBot.RGBLights.RGB_L, 0xff8000)
})
robot.onObstacleDistanceChanged(function () {
    rychlost += vzdalenost
})
robot.onLineLeftRightDetected(false, false, function () {
    robot.motorSteer(0, -30)
    cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff0000)
})
robot.onLineDetected(function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Green))
    robot.setColor(0x00ff00)
    sonarspeed = 20
})
robot.onLineLeftRightDetected(true, false, function () {
    robot.motorSteer(doleva, rychlost)
    cuteBot.colorLight(cuteBot.RGBLights.RGB_R, 0xff8000)
})
let doprava = 0
let doleva = 0
let sonarspeed = 0
let rychlost = 0
let vzdalenost = 0
let strip: neopixel.Strip = null
robot.elecfreaksCuteBot.start()
strip = neopixel.create(DigitalPin.P15, 2, NeoPixelMode.RGB)
vzdalenost = robot.obstacleDistance()
let Light = input.lightLevel()
let center = input.compassHeading()
rychlost = 0
sonarspeed = 0
pins.touchSetMode(TouchTarget.LOGO, TouchTargetMode.Capacitive)
robot.setAssist(RobotAssist.LineFollowing, true)
robot.setAssist(RobotAssist.Speed, true)
robot.setAssist(RobotAssist.Display, true)
input.setAccelerometerRange(AcceleratorRange.FourG)
robot.calibrate()
robot.motorStop()
doleva = Math.map(center, 360, 0, -200, -50)
doprava = Math.map(center, 0, 360, 50, 200)
Light = Math.constrain(Light, 0, 255)
strip.setMatrixWidth(2)
basic.forever(function () {
    if (rychlost >= 75) {
        rychlost = 10
        sonarspeed = 10
    }
    rychlost += 1
    sonarspeed += 1
    strip.setBrightness(Light)
    basic.pause(5000)
})
