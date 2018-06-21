# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.gis.geos import Point
from roadbot_b.models import Accidents
# from django.views.decorators.csrf import csrf_exempt
import json

def accident_info(request):
    if request.method == 'GET':

        lat = request.GET.get('lat')
        lng = request.GET.get('lng')

        lat = float(lat)
        lng = float(lng)
  
        location = Point(lat, lng, srid=4326)

        danger_zone = Accidents.objects.filter(geom__contains=location)

        if danger_zone:
            result = "Attention: Danger Zone %s" % danger_zone
        else:
            result = "keep walking"
        res_json = json.dumps(result)
        return HttpResponse(res_json,
                            content_type = 'application/json')
         

        
