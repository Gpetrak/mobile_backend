# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.gis.geos import Point
from roadbot_b.models import Accidents
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def accident_info(request):
    if request.method == 'GET':
        # convert json data to python dictionary
        # latlng = json.loads(request.body)
        # latitude = latlng['lat']
        # longitude = latlng['lng']
        # lat = request.POST.get('latitude')
        # lng = request.POST.get('longitude')

        # lat = float(lat)
        # lng = float(lng)

        # location = Point(lng, lat, srid=4326)

        # danger_zone = Accidents.objects.filter(geom__contains=location)

        #if danger_zone:
        #    result = "Attention: Danger Zone %s" % danger_zone
        #else:
        #    result = "keep walking"
        
        return HttpResponse("success")
                            #content_type = 'application/json'
         

        
