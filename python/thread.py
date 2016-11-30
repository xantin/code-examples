import threading
import Queue
import sys

# https://pymotw.com/2/threading/#locks-as-context-managers

def do_work(in_queue, out_queue, shift):
    while True:
        item = in_queue.get()
        #result = caesar(item, shift)
        result=item
        out_queue.put(result)
        in_queue.task_done()

def caesar(plainText, shift):
    cipherText = ""
    for ch in plainText:
        if ch.isalpha():
            stayInAlphabet = ord(ch) + shift
            if stayInAlphabet > ord('z'):
                stayInAlphabet -= 26
            finalLetter = chr(stayInAlphabet)
            cipherText += finalLetter
    return cipherText

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Duzgun giriniz: '<filename>.py s n l'")
        sys.exit(0)
    else:
        s = int(sys.argv[1])
        n = int(sys.argv[2])
        l = int(sys.argv[3])

    work = Queue.Queue()
    results = Queue.Queue()
    text_data = "this is in right order"
    index=0

    # start for workers
    for i in xrange(n):
        t = threading.Thread(target=do_work, args=(work, results, s))
        t.daemon = True
        t.start()

    # produce data
    for i in range(0, len(text_data), l):
        work.put(text_data[index:index + l])
        index += l

    work.join()

    # get the results
    for i in range(0, len(text_data), l):
        print results.get()

    sys.exit()