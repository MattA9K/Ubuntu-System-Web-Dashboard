# MAIN
from django.shortcuts import render

from django.http import HttpResponse
from django.template import loader

from django.contrib.auth.models import User, Group

from rest_framework import viewsets, generics
from cinicraft_home.serializers import GroupSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.
from subprocess import Popen, PIPE
import platform


def index(request):
    template = loader.get_template('index.html')
    context = {
        "message": "Welcome to CiniCrafts official website!",
    }
    return HttpResponse(template.render(context, request))


class getRam(APIView):
    def get(self, request, format=None):
        if platform.system() == "Darwin":
            context = {
                "free": 298400,
                "available": 770988,
                "total": 2614172}
            return Response(context)

        def removeWhiteSpace(str):
            return str.replace(" ", "")

        def removeKB(str):
            return str.replace(" kB", "")

        def cleanFirstElement(str):
            return str.replace("b'", "")

        def main_first(str):
            return removeWhiteSpace(removeKB(cleanFirstElement(str))).replace("MemTotal:", "")

        def all_others(str):
            return removeWhiteSpace(removeKB(str))

        p = Popen(['cat', '/proc/meminfo'], stdin=PIPE, stdout=PIPE, stderr=PIPE)
        output, err = p.communicate(b"input data that is passed to subprocess' stdin")
        rc = p.returncode

        final = str(output).split("\\n")

        memTotal = main_first(final[0])
        memFree = main_first(final[1]).replace("MemFree:", "")
        memAvailable = main_first(final[2]).replace("MemAvailable:", "")

        context = {"total": 0, "free": 0, "available": 0}
        context['total'] = int(memTotal)
        context['free'] = int(memFree)
        context['available'] = int(memAvailable)

        return Response(context)


class getStorage(APIView):  # cat swaps
    def get(self, request, format=None):

        if platform.system() == "Darwin":
            context = [
                {
                    "size": "2689020",
                    "name": "/dev/sda5",
                    "used": "6720"}]
            return Response(context)

        p = Popen(['cat', '/proc/swaps'], stdin=PIPE, stdout=PIPE, stderr=PIPE)
        output, err = p.communicate(b"input data that is passed to subprocess' stdin")
        rc = p.returncode

        context = {"size": "", "used": "", "name": ""}
        final = str(output).split("\\n")
        returnArray = []

        skippedFirst = False
        for item in final:
            strArray = item.replace('\\t', '  ').split(' ')
            i = 0
            size = ""
            used = ""
            name = ""
            for str1 in strArray:
                goodStr = str1.replace(' ', '')
                if goodStr != '' and skippedFirst == True:
                    if i == 2:
                        size = goodStr
                    elif i == 3:
                        used = goodStr
                    elif i == 0:
                        name = goodStr
                    i += 1
            print('________________')
            skippedFirst = True
            if size != '':
                context = {"size": size, "used": used, "name": name}
                returnArray.append(context)

        print(returnArray)

        return Response(returnArray)


class getCPUInfo(APIView):  # cat cpuinfo
    def get(self, request, format=None):

        if platform.system() == "Darwin":
            context = {
                "cache_size": "8192 KB",
                "cores": "3",
                "speed_MHz": "2711.893",
                "model_name": "Intel(R) Core(TM) i7-6820HQ CPU @ 2.70GHz"
            }
            return Response(context)

        p = Popen(['cat', '/proc/cpuinfo'], stdin=PIPE, stdout=PIPE, stderr=PIPE)
        output, err = p.communicate(b"input data that is passed to subprocess' stdin")
        rc = p.returncode

        final = str(output).split("\\n")

        cache_size = ''
        model_name = ''
        processor_id = ''
        speed_MHz = ''
        total_cpus = ''

        for item in final:
            line = item.replace("\\t", "")

            key = ''
            value = ''

            try:
                value = line.split(":")[1]
                key = line.split(":")[0]
            except:
                key = line.split(":")[0]
                value = 'n/a'

            if key == 'cache size':
                cache_size = value
            elif key == 'model name':
                model_name = value
            elif key == 'processor id':
                processor_id = value
            elif key == 'cpu MHz':
                speed_MHz = value
            elif key == 'cpu cores':
                total_cpus = value

        context = {"cache_size": cache_size.strip(),
                   "model_name": model_name.strip(),
                   "speed_MHz": speed_MHz.strip(),
                   "cores": total_cpus.strip()}

        return Response(context)


class getUpTime(APIView):  # cat uptime
    def get(self, request, format=None):
        if platform.system() == "Darwin":
            context = {
                "ticks": "2491.52",
                "secs": "864.89"
            }
            return Response(context)

        p = Popen(['cat', '/proc/uptime'], stdin=PIPE, stdout=PIPE, stderr=PIPE)
        output, err = p.communicate(b"input data that is passed to subprocess' stdin")
        rc = p.returncode

        final = str(output).split(" ")

        context = {"secs": final[0].replace('\n', '').replace("b'", ""),
                   "ticks": final[1].replace('\\n', '').replace("'", "")}

        return Response(context)


class getProcesses(APIView):  # ps aux

    def get(self, request, format=None):

        finalWrapper = {
            "CPU_Usage": float(0),
            "RAM_Usage": float(0),
            "Processes": []}

        sumOfCPU = 0.0
        sumOfRAM = 0.0

        def is_number(s):
            try:
                float(s)
                return True
            except ValueError:
                return False

        def getColName(i):
            if i == 1:
                return 'USER'
            elif i == 2:
                return 'PID'
            elif i == 3:
                return 'CPU'
            elif i == 4:
                return 'MEM'
            elif i == 5:
                return 'VSZ'
            elif i == 6:
                return 'RSS'
            elif i == 7:
                return 'TTY'
            elif i == 8:
                return 'STAT'
            elif i == 9:
                return 'START'
            elif i == 10:
                return 'TIME'
            else:
                return '||'

        p = Popen(['ps', 'aux'], stdin=PIPE, stdout=PIPE, stderr=PIPE)
        output, err = p.communicate(b"input data that is passed to subprocess' stdin")
        rc = p.returncode

        final = str(output).split("\\n")

        for item in final:
            process_name = item[66:]
            row = item.split(" ")
            i = 1
            context = {"COMMAND": process_name,
                       "PID": "",
                       "CPU": "",
                       "MEM": "",
                       "VSZ": "",
                       "RSS": "",
                       "TTY": "",
                       "STAT": "",
                       "START": "",
                       "TIME": "", }
            for col in row:
                if col != '':
                    if i < 11:
                        context[getColName(i)] = col
                        print(col)
                        print(is_number(col))
                        if i == 3 and is_number(col) == True:
                            sumOfCPU += float(col.strip())
                        elif i == 4 and is_number(col) == True:
                            sumOfRAM += float(col.strip())
                        i += 1
            i = 1
            finalWrapper['Processes'].append(context)
            finalWrapper['CPU_Usage'] = sumOfCPU
            finalWrapper['RAM_Usage'] = sumOfRAM
        return Response(finalWrapper)
        # print(item)

