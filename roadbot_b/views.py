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
  
        location = Point(lng, lat, srid=4326)

        danger_zone = Accidents.objects.filter(geom__contains=location)

        if danger_zone:
            # create a list with the field's values of the resulted object
            fields = []
            info = 'Alert'
            cause = danger_zone.values_list('cause', flat=True).get()
            str_addr = danger_zone.values_list('str_addr', flat=True).get()
            accid_num = int(danger_zone.values_list('accid_num', flat=True).get())

            fields.extend([info, cause, str_addr, accid_num])
            result = json.dumps(fields)
            # result = "Attention: Danger Zone %s" % danger_zone
        else:
            fields = []
            info = "You are safe"
            cause = ""
            str_addr = ""
            accid_num = 0
            fields.extend([info, cause, str_addr, accid_num])
            result = json.dumps(fields)
        return HttpResponse(result,
                            content_type = 'application/json')
         

        
