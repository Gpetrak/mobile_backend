# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse
from mobile_backend.settings import MEDIA_ROOT
from mobile_backend.settings import GEOSERVER_URL
from django.contrib.gis.geos import Point
from django.views.decorators.csrf import csrf_exempt
from naturall.models import Gps_points
import json

def naturall_home(request):
    # context = {'GEOSERVER_URL': GEOSERVER_URL}
    return render(request, 
                  'naturall/map.html',
                 # context
                 )

@csrf_exempt
def datastore(request):
    if request.method == 'POST':
        # convert json data to python dictionary
        gps_data = json.loads(request.body)
        lat = gps_data['lat']
        lon = gps_data['lon']
        temp = gps_dtaa['temp']
        
        location = Point(latitude, longitude, srid=4326)

        e1 = Gps_data(location = location,
                   temp = temprature)

        gps1.save()

        # check if e1 saved
        if e1.pk is None:
            return HttpResponse("Upload failed")
        else:
            return HttpResponse("Success")


def send_data(request):
    if request.method == 'GET':
        point = [24,38.0]
        point_json = json.dumps(point)

    return HttpResponse(
               point_json,
               #content_type='application/json'
               )
