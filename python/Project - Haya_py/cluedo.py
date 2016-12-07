from tkinter import *
import random


def resetSuggestion():
    global currentSuspect
    global currentWeapon
    global currentLocation
    global xChar, yChar
    global count             #NEW
    xChar = 200
    yChar = 400
    count = 0
    currentSuspect = "White"
    currentWeapon = "Dagger"
    currentLocation = "Dining"
    drawSuggestion()

def suspectParade():
    global currentSuspect
    global currentWeapon
    global currentLocation
    global xChar
    global count
    global window              #NEW
    global foo, man, chu
    currentSuspect = random.choice(foo)
    currentWeapon = random.choice(chu)
    currentLocation = random.choice(man)
    anim()

def anim():
    global xChar
    global count
    if count < 8:
        window.after(100, anim)   #NEW
        count = count + 1
        xChar = xChar + 50
        drawSuggestion()



# we will use only lowercase letters in the filenames
# spaces will be changed to be underscores
# dots will be changed to be 'd'
def fixFilename(name):
    return name.lower().replace(" ","_").replace(".","d")
#
def drawLocation():
    global currentLocation
    global currentLocationImage
    global canvas
    locationFile = fixFilename(currentLocation) + ".gif"
    currentLocationImage = PhotoImage(file=locationFile)
    canvas.create_image(400, 300, image=currentLocationImage)

def change_coord(event):
    global window     #NEW
    global xChar, yChar
    if event.keysym == 'Up':
        yChar = yChar - 15
        drawSuggestion()
    elif event.keysym == 'Down':
        yChar = yChar + 15
        drawSuggestion()
    elif event.keysym == 'Right':
        xChar = xChar + 15
        drawSuggestion()
    elif event.keysym == 'Left':
        xChar = xChar - 15
        drawSuggestion()


def drawSuspect():
    global currentSuspect
    global currentSuspectImage
    global canvas
    suspectFile = fixFilename(currentSuspect) + ".gif"
    currentSuspectImage = PhotoImage(file=suspectFile)
    canvas.create_image(xChar, yChar, image=currentSuspectImage)

def drawSuggestion():
    drawLocation()
    drawSuspect()

def setLocation(location):
    global currentLocation
    currentLocation = location
    drawSuggestion()

def drawWeapon():
    global currentWeapon
    global currentWeaponImage
    global canvas
    weaponFile= fixFilename(currentWeapon) + ".gif"
    currentWeaponImage = PhotoImage(file=weaponFile)
    canvas.create_image(300, 300, image=currentWeaponImage)
    canvas.create_image(xChar, yChar, image=currentSuspectImage)

    
def setLocation(location):
    global currentLocation
    currentLocation = location
    drawSuggestion()

def setDining():
    global currentLocation
    currentLocation = "dining"
    drawSuggestion()
    
def setLounge():
    global currentLocation
    currentLocation = "lounge"
    drawSuggestion()
    
def setConservatory():
    global currentLocation
    currentLocation = "conservatory"
    drawSuggestion()

def setLibrary():
    global currentLocation
    currentLocation = "Library"
    drawSuggestion()

def setBilliard():
    global currentLocation
    currentLocation = "Billiard"
    drawSuggestion()

def setHall():
    global currentLocation
    currentLocation = "Hall"
    drawSuggestion()

def setStudy():
    global currentLocation
    currentLocation = "Study"
    drawSuggestion()
    
    
def setWhite():
    global currentSuspect
    currentSuspect = "White"
    drawSuggestion()

def setMustard(): 
    global currentSuspect
    currentSuspect = "Mustard"
    drawSuggestion()

def setGreen():   
    global currentSuspect
    currentSuspect = "Green"
    drawSuggestion()

def setPeacock():   
    global currentSuspect
    currentSuspect = "Peacock"
    drawSuggestion()

    
def setWeapon():
    global currentWeapon
    currentWeapon = "Dagger"
    drawSuggestion()

def setRope():
    global currentWeapon
    currentWeapon = "Rope"
    drawSuggestion()
     
def setCandlestick():
    global currentWeapon
    currentWeapon = "Candlestick"
    drawSuggestion()

     
def setLeadpipe():
    global currentWeapon
    currentWeapon = "Leadpipe"
    drawSuggestion()

    
def setRevolver():
    global currentWeapon
    currentWeapon = "Revolver"
    drawSuggestion()


def setSpanner():
    global currentWeapon
    currentWeapon = "Spanner"
    drawSuggestion()




def setupGameControls(w):
    global canvas

    btnReset = Button(w, text="Reset Suggestion", command=resetSuggestion)
    btnReset.place(x = 10, y = 5)
    btnReset = Button(w, text="Suspect Parade", command=suspectParade)
    btnReset.place(x = 200, y = 5)
#Background
    btnLibrary = Button(w, text="Dining", command=setDining)
    btnLibrary.place(x = 10, y = 650)
    btnLibrary = Button(w, text="Lounge", command=setLounge)
    btnLibrary.place(x = 80, y = 650)
    btnLibrary = Button(w, text="Conservatory", command=setConservatory)
    btnLibrary.place(x = 160, y = 650)
    btnLibrary = Button(w, text="Library", command=setLibrary)
    btnLibrary.place(x = 270, y = 650)
    btnLibrary = Button(w, text="Billiard", command=setBilliard)
    btnLibrary.place(x = 340, y = 650)
    btnLibrary = Button(w, text="Hall", command=setHall)
    btnLibrary.place(x = 410, y = 650)
    btnLibrary = Button(w, text="Study", command=setStudy)
    btnLibrary.place(x = 460, y = 650)
#Characters
    btnScarlet = Button(w, text="Mrs.White", command=setWhite)
    btnScarlet.place(x = 10, y = 700)
    btnPlum = Button(w, text="Colonel Mustard", command=setMustard)
    btnPlum.place(x = 110, y = 700)
    btnPlum = Button(w, text="Reverend Green", command=setGreen)
    btnPlum.place(x = 240, y = 700)
    btnPlum = Button(w, text="Mrs. Peacock", command=setPeacock)
    btnPlum.place(x = 370, y = 700)
#Weapon
    btnPlum = Button(w, text="Dagger", command=setWeapon)
    btnPlum.place(x = 10, y = 750)
    btnPlum = Button(w, text="Rope", command=setRope)
    btnPlum.place(x = 80, y = 750)
    btnPlum = Button(w, text="Candlestick", command=setCandlestick)
    btnPlum.place(x = 140, y = 750)
    btnPlum = Button(w, text="Leadpipe", command=setLeadpipe)
    btnPlum.place(x = 240, y = 750)
    btnPlum = Button(w, text="Revolver", command=setRevolver)
    btnPlum.place(x = 330, y = 750)
    btnPlum = Button(w, text="Spanner", command=setSpanner)
    btnPlum.place(x = 410, y = 750)

    canvas = Canvas(w, width=800, height=600)
    canvas.place(x=10, y=30)
    canvas.create_rectangle(0, 0, 800, 600, fill="white")


           #NEW
window = Tk()
window.geometry("900x800")
window.bind_all('<Up>', change_coord)
window.bind_all('<Down>', change_coord)
window.bind_all('<Left>', change_coord)
window.bind_all('<Right>', change_coord)
xChar = 200
yChar = 400
count = 0
foo = ['colonel_mustard', 'miss_white', 'reverend_green', 'miss_peacock', 'miss_scarlet', 'professor_plum']
man = ['ballroom', 'billard', 'conservatory', 'dinroom', 'hall', 'kitchen', 'library', 'lounge', 'study']
chu = ['candlestick', 'dagger', 'lead_pipe', 'revolver', 'rope', 'spanner']
setupGameControls(window)
resetSuggestion()
drawSuggestion()
window.mainloop()
