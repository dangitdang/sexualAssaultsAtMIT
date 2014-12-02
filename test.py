file= open('input.txt','r')
strings = file.read().split("\n")
finalArray = strings[1:101]
print finalArray
def checkSqrt(i):
    return i**.5 % 1 ==0
for i in xrange(len(finalArray)):
    begin, end = map(int,finalArray[i].split(" "))
    begin = begin**.5
    end = end**.5
    print int(end-begin)
