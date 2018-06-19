# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.gis.db import models

class Accidents(models.Model):
    gid = models.AutoField(primary_key=True)
    id = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    cause = models.CharField(max_length=80, blank=True, null=True)
    str_addr = models.CharField(max_length=18, blank=True, null=True)
    accid_num = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    geom = models.MultiPolygonField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'accidents'

    def __str__(self):
        return self.cause

    def __unicode__(self):
        return self.cause or u''
