from PIL import Image, ImageDraw
import random
from datetime import datetime

def create_fractal(name, w, h):
	width = w
	height = h

	midx = height / 2
	midy = width / 2
	
	im = Image.new('L', (width, height))
	draw = ImageDraw.Draw(im)
	pix = im.load()

	c = complex(-0.3576, 0.6753)
	
	for i in range(1, width):
		for j in range(1, height):
			k = complex((i - midx) / midx, (j - midy) / midy)
			pix[i, j] = check_iterations(k, c) * 2
	im.save(name + ".png")
	print("t")

def check_iterations(a, b):
		i = 0
		while abs(a) < 2:
			a = a**2 + b
			i = i + 1
			if i > 100:
				break
		return i

start = datetime.now()

create_fractal("fractal", 2000, 2000)

print(datetime.now() - start)
