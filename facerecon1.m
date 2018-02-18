function facerecon1()
cam = webcam;
k = 4;
[xd,Fs]=audioread('warn1.mp3');
[y2,Fs2]=audioread('warn2.mp3');
warncount = 0;
level = 0;
while 1
    if k >= 7
        break;
    end
    I= snapshot(cam);
    %imshow(I);
    I= imresize(I,0.5);
    Detectface = vision.CascadeObjectDetector();
    %Detectface.MergeThreshold = 7;
    BB = step(Detectface,I);
    [x,~] = size(BB);
    if x == 0
        warncount = warncount + 1;
        if level == 0 && warncount == 2
            level = 1;
            warncount = 0;
            sound(xd,Fs);
        end
        if level == 1 && warncount == k
            warncount = 0;
            k = k + 2;
            sound(y2,Fs2);
        end
    else
        warncount = 0;
    end
    pause(0.5)
end
end


