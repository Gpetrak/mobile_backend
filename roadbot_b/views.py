# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.gis.geos import Point
from roadbot_b.models import Accidents
from django.views.decorators.csrf import csrf_exempt
# import json

@csrf_exempt
def accident_info():
    if request.method == 'POST':
        # convert json data to python dictionary
        lat = request.POST.get('latitude')
        lng = request.POST.get('longitude')

        lat = float(lat)
        lng = float(lng)

        location = Point(lat, lng, srid=4326)

        danger_zone = Accidents.objects.filter(geom__contains=location)

        if danget_zone:
            result = "Attention: Danger Zone %s" % danger_zone
        else:
            result = "keep walking"
        
        return HttpResponse(result,
                            content_type = 'application/json'
                            )

        