from pathlib import Path
import json, math
import numpy as np
import soundfile as sf

HERE=Path(__file__).resolve().parent
SR=48000
DUR=30.0
N=int(SR*DUR)
mix=np.zeros(N,dtype=np.float64)
def add_tone(start,duration,freq,gain=.1,kind="sine"):
    a=max(0,int(start*SR)); b=min(N,int((start+duration)*SR))
    if b<=a:return
    t=np.arange(b-a)/SR
    env=np.minimum(1,t/.08)*np.minimum(1,(duration-t)/.15)
    wave=np.sin(2*np.pi*freq*t)
    if kind=="drum":
        wave=(np.sin(2*np.pi*freq*t)*np.exp(-t*12)+.35*np.sin(2*np.pi*freq*2.1*t)*np.exp(-t*19))
    mix[a:b]+=gain*wave*np.maximum(0,env)
def add_noise(start,duration,gain,lowpass=False):
    a=max(0,int(start*SR));b=min(N,int((start+duration)*SR))
    if b<=a:return
    rng=np.random.default_rng(int(start*1000)+71)
    z=rng.normal(0,1,b-a)
    if lowpass:
        z=np.convolve(z,np.ones(180)/180,mode="same")
    t=np.arange(b-a)/SR
    env=np.minimum(1,t/.8)*np.minimum(1,(duration-t)/1.0)
    mix[a:b]+=gain*z*np.maximum(0,env)
# Original low orchestral-style drone and restrained pulse, synthesized from harmonics.
for f0 in [55,82.4,110]:
    add_tone(0,30,f0,.025)
for start in np.arange(.3,30,1.25):
    add_tone(float(start),.55,48,.12,"drum")
    add_tone(float(start)+.04,.42,73,.035,"drum")
# Tense rising string-like harmonic beds; scene changes follow the picture timeline.
for start,end,root in [(0,8,110),(8,18,98),(18,25,82.4),(25,30,73.4)]:
    for harmonic,g in [(1,.025),(1.5,.012),(2,.009),(3,.004)]:
        add_tone(start,end-start,root*harmonic,g)
# Battlefield wind and distant low rumble.
add_noise(0,30,.018,True)
# Timed whooshes, thumps and final impact: synthetic foley, no unlicensed samples.
for at in [1.5,3.1,5.0,9.0,11.2,13.5]:
    add_noise(at,.65,.045,False)
for at in [15.7,18.3,25.8,28.7]:
    add_tone(at,.8,42,.24,"drum")
    add_noise(at,.45,.035,False)
# Mix generated Telugu speech with controlled timing and voice priority.
voice_dir=HERE/"out"/"voice"
durations=json.loads((voice_dir/"dur.json").read_text())
starts=[0.25,7.2,15.0,22.0]
for i,start in enumerate(starts,1):
    p=voice_dir/f"{i:02d}.wav"
    if not p.exists():
        # IDs are zero-padded strings in lines.json.
        p=voice_dir/f"{i:02d}.wav"
    if p.exists():
        audio,sr=sf.read(p)
        if audio.ndim>1: audio=audio.mean(axis=1)
        if sr!=SR:
            old=np.arange(len(audio))/sr
            new=np.arange(int(len(audio)*SR/sr))/SR
            audio=np.interp(new,old,audio)
        a=int(start*SR);b=min(N,a+len(audio))
        if b>a: mix[a:b]+=audio[:b-a]*.82
# Soft limiter and export.
peak=max(1.0,float(np.max(np.abs(mix))/.92))
mix=np.tanh(mix/peak*1.25)/1.25
sf.write(HERE/"out"/"mix.wav",mix.astype(np.float32),SR)
print("Wrote",HERE/"out"/"mix.wav")
